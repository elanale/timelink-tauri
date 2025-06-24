import { useAuth } from "@timelink/ui/context/AuthContext.tsx";
import { db } from "@timelink/utils/firebase";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { createEffect, createSignal, type Component } from "solid-js";

const Clock: Component = () => {
	const { user } = useAuth();
	const [clockInTime, setClockInTime] = useState<string | null>(null);
	const [clockOutTime, setClockOutTime] = useState<string | null>(null);
	const [status, setStatus] = useState<"idle" | "in" | "out">("idle");
	const [logs, setLogs] = createSignal<any[]>([]);
	const [totalHours, setTotalHours] = useState(0);

	const handleClockIn = async () => {
		const now = new Date();
		setClockInTime(now.toLocaleTimeString());
		setClockOutTime(null);
		setStatus("in");

		await addDoc(collection(db, "timeLogs", user!.uid, "logs"), {
			clockIn: Timestamp.fromDate(now),
			clockOut: null,
		});

		fetchLogs();
	};

	const handleClockOut = async () => {
		const now = new Date();
		setClockOutTime(now.toLocaleTimeString());
		setStatus("out");

		const logsRef = collection(db, "timeLogs", user!.uid, "logs");
		const snapshot = await getDocs(logsRef);

		const incompleteLog = snapshot.docs
			.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
			.filter((log) => !log.clockOut)
			.sort((a, b) => b.clockIn?.seconds - a.clockIn?.seconds)[0];

		if (incompleteLog) {
			const logDocRef = doc(
				db,
				"timeLogs",
				user!.uid,
				"logs",
				incompleteLog.id,
			);
			await updateDoc(logDocRef, {
				clockOut: Timestamp.fromDate(now),
			});
		}

		fetchLogs();
	};

	const fetchLogs = async () => {
		const logsRef = collection(db, "timeLogs", user!.uid, "logs");
		const snapshot = await getDocs(logsRef);
		const fetchedLogs: any[] = [];
		let total = 0;

		snapshot.forEach((doc) => {
			const data = doc.data();
			const clockIn = data.clockIn?.toDate?.() ?? null;
			const clockOut = data.clockOut?.toDate?.() ?? null;
			let duration = 0;

			if (clockIn && clockOut) {
				duration = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60 * 60);
				total += duration;
			}

			fetchedLogs.push({
				id: doc.id,
				clockIn,
				clockOut,
				duration,
			});
		});

		// Sort newest first
		setLogs(
			fetchedLogs.sort((a, b) => {
				if (!a.clockIn || !b.clockIn) return 0;
				return b.clockIn.getTime() - a.clockIn.getTime();
			}),
		);

		setTotalHours(total);
	};

	createEffect(() => {
		if (user) fetchLogs();
	}, [user]);

	return (
		<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md max-w-md mx-auto text-center space-y-6">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
				Employment Clock
			</h1>

			<p>
				<strong className="text-white">Status:</strong>{" "}
				<span
					className={
						status === "in"
							? "text-green-500"
							: status === "out"
								? "text-red-500"
								: "text-blue-500"
					}
				>
					{status === "idle"
						? "Not clocked in"
						: status === "in"
							? "Clocked In"
							: "Clocked Out"}
				</span>
			</p>

			<div className="flex justify-center gap-4">
				<button
					onClick={handleClockIn}
					className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
					type="button"
				>
					Clock In
				</button>
				<button
					onClick={handleClockOut}
					className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
					type="button"
				>
					Clock Out
				</button>
			</div>

			<div className="text-left text-gray-700 dark:text-gray-300 space-y-2">
				<p>
					<strong>Clock In:</strong> {clockInTime ?? "--:--"}
				</p>
				<p>
					<strong>Clock Out:</strong> {clockOutTime ?? "--:--"}
				</p>
				<p>
					<strong>Total Hours:</strong> {totalHours.toFixed(2)}
				</p>
			</div>

			<h3 className="text-lg font-semibold mt-6 text-white">
				Time Log History
			</h3>
			<div className="overflow-x-auto">
				<table className="min-w-full text-white">
					<thead>
						<tr className="bg-gray-700 text-left">
							<th className="px-4 py-2">Clocked In</th>
							<th className="px-4 py-2">Clocked Out</th>
							<th className="px-4 py-2">Hours</th>
						</tr>
					</thead>
					<tbody>
						{logs.map((log) => (
							<tr key={log.id} className="border-t border-gray-600">
								<td className="px-4 py-2">
									{log.clockIn ? log.clockIn.toLocaleString() : "--"}
								</td>
								<td className="px-4 py-2">
									{log.clockOut ? log.clockOut.toLocaleString() : "--"}
								</td>
								<td className="px-4 py-2">
									{log.duration ? log.duration.toFixed(2) : "--"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Clock;

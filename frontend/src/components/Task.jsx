export default function Task({task}) {
    return (
        <div className="bg-blue-200 shadow-lg p-5 rounded-md">
            <p className="font-bold">Tarea</p>
            <p className="font-light text-gray-400">{task.text}</p>
        </div>
    );
}
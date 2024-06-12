import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
    const navigate = useNavigate();

    const [text, setText] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const clearAllUseState = () => {
        setErrors({});
        setText('');
        setIsLoading(false);
    }

    const saveTask = async (e) => {
        e.preventDefault();        
        setIsLoading(true);

        if (text == '') {
            setErrors({text: 'Campo requerido'});
            setIsLoading(false);
            return ;
        }

        try {
            const response = await axios.post('http://localhost:4000/tasks', {text: text});
            alert('Tarea guardada');
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('No se pudo guardar');
        }

        clearAllUseState();
    };


    return (
        <div>
            <form onSubmit={saveTask}>
                <div className="py-4 px-8">
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2">Tarea:</label>
                        <textarea className="border rounded w-full py-2 px-3 text-grey-darker" placeholder="Escribe tu tarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                        {errors.text && (<p className="text-red-500">{errors.text}</p>)}
                    </div>
                    <div className="mb-4">
                        {! isLoading && (<button type="submit" className="rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 ">Save</button>)}
                    </div>
                </div>
            </form>
        </div>
    )
}
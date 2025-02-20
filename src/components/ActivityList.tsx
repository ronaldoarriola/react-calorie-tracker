import {Activity, Category} from "../types";
import {Dispatch, useMemo} from "react";
import {PencilSquareIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {categories} from "../data/categories.ts";
import {ActivityActions} from "../reducers/activity-reducer.ts";

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map((cat: Category) => cat.id === category ? cat.name : ''), [activities]);

    const handleActiveId = (id: Activity['id']) => {
        dispatch({
            type: 'save-activeId',
            payload: {
                id
            }
        });
    }

    const handleDelete = (id: Activity['id']) => {
        dispatch({
            type: 'delete-activity',
            payload: {
                id
            }
        });
    }

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities]);

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

            {isEmptyActivities
                ? <p className="text-center my-5">No hay actividades aún</p>
                : activities.map(activity => (
                    <div
                        key={activity.id}
                        className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
                    >
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                        ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(Number(activity.category))}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>Calorias</span>
                            </p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => handleActiveId(activity.id)}
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>

                            <button
                                onClick={() => handleDelete(activity.id)}
                            >
                                <XCircleIcon
                                    className="h-8 w-8 text-red-500"
                                />
                            </button>
                        </div>
                    </div>
                ))}
        </>
    );
}
import { useEffect, useState } from "react";
import { getRoomTypes } from "../../utils/ApiFunction";

export default function RoomTypeSelector({ handleRoomInputChange, newRoom }) {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomTypes, setNewRoomTypes] = useState("");

    useEffect(() => {
        getRoomTypes().then((res) => {
            setRoomTypes(res);
        });
    }, []);

    function newRoomInputHandler(e) {
        setNewRoomTypes(e.target.value);
    }

    function addNewRoomTypeHandler(e) {
        if (newRoomTypes !== "") {
            setRoomTypes([...roomTypes, newRoomTypes]);
            setNewRoomTypes("");
            setShowNewRoomTypeInput(false);
        }
    }

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select 
                        name="roomType" 
                        id="roomType" 
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add new") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                newRoomInputHandler(e);
                            }
                        }}
                    >
                        <option value={""}>Select a room type</option>
                        <option value={"Add new"}>Add new</option>
                        {roomTypes.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                    { showNewRoomTypeInput === true && (
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Enter a new room type"
                                onChange={newRoomInputHandler}
                            />
                            <button className="btn btn-hotel" type="button" onClick={addNewRoomTypeHandler}>Add</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
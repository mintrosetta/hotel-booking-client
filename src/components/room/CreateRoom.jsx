import { useState } from "react";
import { addRoom } from "../../utils/ApiFunction";

export default function CreateRoom() {
    const { room, setRoom } = useState({
        photo: null,
        roomType: "",
        price: 0.0
    });
    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function formInputHandler(e) {
        let name = e.target.name;
        let val = e.target.value;

        if (name === "price") {
            if (!isNaN(val)) {
                val = Number(val);
            } else {
                val = 0;
            }
        }

        setRoom({...room, name: val});
    } 

    function imageChangeHandler(e) {
        const selectedImg = e.target.file[0];

        setRoom({...room, photo: selectedImg });
        setImagePreview(URL.createObjectURL(selectedImg));
    }

    async function formSubmitHandler(e) {
        e.preventDefault();

        try {
            const response = await addRoom(room.photo, room.roomType, room.price);
            
            if (response !== undefined) {
                setSuccessMessage("A new room was created");
                setErrorMessage("");
                setRoom({
                    photo: null,
                    roomType: "",
                    price: 0.0
                });
            } else {
                setErrorMessage("Error creating room");
            }
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Create room</h2>
                            <form onSubmit={formSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="roomType" className="form-label">Room type</label>
                                    <div>

                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        id="price" 
                                        className="form-control"
                                        value={room.price} 
                                        onChange={(e) => setRoom({...room, price: Number(e.target.value)})}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Proto</label>
                                    <input 
                                        type="file" 
                                        id="photo"
                                        name="photo"
                                        className="form-control"
                                        onChange={(e) => setRoom({ ...room, photo: e.target.value })}
                                    />
                                    { imagePreview && (
                                        <img 
                                            src={imagePreview} 
                                            alt="preview image" 
                                            style={{maxWidth: "400px", maxHeight: "400px"}}
                                            className="mb-3"
                                        />
                                    )}
                                </div>
                                <div className="d-grid d-md-flex mt-2">
                                    <button type="submit" className="btn btn-outline-primary">Save room</button>
                                </div>
                            </form>
                    </div>
                </div>
            </section>
        </>
    );
}

// // https://youtu.be/0XJu4Nnl0Kc?si=t4JHWswfelmeb2tx&t=7608
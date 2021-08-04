import React, { useState, useEffect } from 'react';
import WorkInProgress from "../work-inprogress.jpg"
import { SketchPicker } from 'react-color';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EventBus from 'eventing-bus';
const Settings = (props) => {
    const [menu, setMenu] = useState(1);
    const [background, setBackground] = useState("");

    const changeMenu = event => {    
        let value = event.target.value;
        confirmAlert({
            title: 'Confirm to change',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setMenu(value);
                        EventBus.publish("sidebar", value);
                        localStorage.setItem("sidebar", value);
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });        
    }

    const changeBackground = (color, event) => {
        confirmAlert({
            title: 'Confirm to change',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setBackground(color.hex);
                        document.body.style.backgroundColor = color.hex;
                        localStorage.setItem("background_color", color.hex);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
        
    }

    useEffect(() => {

        if (localStorage.getItem("background_color")) {
            document.body.style.backgroundColor = localStorage.getItem("background_color");
        }

        if (localStorage.getItem("sidebar")) {
            setMenu(localStorage.getItem("sidebar"));
        }

    }, []);

    return (
        <div className="row">
            <div className="col-sm-6 offset-sm-3 mt-5 pa-5">
            <form name="settings">
                <div className="mb-3">
                        <select className="form-select form-control me-2" 
                        aria-label="Default select example" 
                        name="menu" value={menu} 
                        onChange={changeMenu}>
                            <option value="1">Left align</option>
                            <option value="2">Right Align</option>
                        </select>
                    <div className="form-text">Mange sidebar alignment.</div>
                </div>
                
                <div className="mb-3 form-check">
                        <SketchPicker color={background}
                            onChange={changeBackground} style={{"margin-left": "-22px"}}/>
                        <div className="form-text">Change App background color.</div>
                </div>
            </form>
            </div>
        </div >
    );
}

export default Settings;
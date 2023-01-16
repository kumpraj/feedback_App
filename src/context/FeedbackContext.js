import { createContext, useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';

const FeedBackContext = createContext();


export const FeedbackProvider = ({ children }) => {
    
    const [feedback, setFeedback] = useState([]);

    //  to fetch feedback from json-server onloading
    useEffect(() => {
        fetchFeedbaack()
    },[])

    //  Fetch feedback
    const fetchFeedbaack = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`);

        const data = await response.json();

        setFeedback(data);
    }

    // state to manage edit functionality
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //  add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback,...feedback]);
    }

    // delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    // update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item ))
        setFeedbackEdit({
            item: {},
            edit: false
        });
    }

    // set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }
    
    return <FeedBackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>{children}</FeedBackContext.Provider>
}

export default FeedBackContext;
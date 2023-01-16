import { createContext, useState, useEffect } from "react";


const FeedBackContext = createContext();


export const FeedbackProvider = ({ children }) => {
    //  for using spinner while loading
    const [isLoading, setIsLoading] = useState(true);

    const [feedback, setFeedback] = useState([]);

    //  to fetch feedback from json-server onloading
    useEffect(() => {
        fetchFeedback()
    },[])

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    // state to manage edit functionality
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
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
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>{children}</FeedBackContext.Provider>
}

export default FeedBackContext;
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
    const fetchFeedback = () => {
        fetch(`/feedback?_sort=id&_order=desc`)
        .then((res) => res.json())
        .then((data) => setFeedback(data))
        

        // setFeedback(data)
        setIsLoading(false)
    }

    // state to manage edit functionality
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
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
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure want to delete?')){
            await fetch(`http://localhost:5000/feedback/${id}`,{
                method: 'DELETE'
            })
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    // update feedback item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`http://localhost:5000/feedback/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item ))
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
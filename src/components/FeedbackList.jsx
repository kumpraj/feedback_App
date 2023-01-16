import {motion, AnimatePresence} from 'framer-motion';
import { useContext } from 'react';
import FeedbackItem from "./FeedbackItem"
import FeedBackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';



function FeedbackList() {

  const {feedback, isLoading} = useContext(FeedBackContext);
    
    if(!isLoading && (!feedback || feedback.length === 0)){
        return <p>No FeedBack Yet</p>
    }
  
  return isLoading ? (<Spinner/>) : (
    <div className="feedback-list">
       <AnimatePresence>
        {feedback.map( (item) => (
          <motion.div
            key={item.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit= {{opacity: 0}}
          >
            <FeedbackItem key={item.id} item={item}/>
          </motion.div>
          ) )
        }
       </AnimatePresence>
    </div>

    /* without animation

     <div className="feedback-list">
        {feedback.map( (item) => (
            <FeedbackItem key={item.id} item={item}
            handleDelete= { handleDelete }/>
        ) )}
    </div> 
    
    */
  )
}


export default FeedbackList;
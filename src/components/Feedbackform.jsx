import { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";



function Feedbackform({handleAdd}) {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState(null);

    const handleTextChange = (e) => {
      if(text === ''){
        setMessage(null);
        setBtnDisabled(true);

      }else if(text !== '' && text.trim().length < 10){
        setMessage('Text must be at least 10 characters');
        setBtnDisabled(true);

      }else{
        setMessage(null);
        setBtnDisabled(false);
      }

       setText(e.target.value);
    
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if(text.trim().length > 10){
        const newFeedback = {
          text,
          rating,
        };

        handleAdd(newFeedback);

        setText('');
      }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How woluld you rate your services with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
                <input onChange= {handleTextChange} placeholder='Write a review' type='text' value={text} />
                <Button type={'submit'} version = {'primary'} isDisabled= {btnDisabled}>Send</Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default Feedbackform
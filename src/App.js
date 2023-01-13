import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import Feedbackform from "./components/Feedbackform";
import AboutPage from "./Pages/AboutPage";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";




function App() {
    
    
    return(
        <FeedbackProvider>
            <Router>
                <Header/>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={
                                <>
                                <Feedbackform/>
                                <FeedbackStats/>
                                <FeedbackList/>
                                </>
                            }/>

                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/post/*" element={<Post/>}/>
                        </Routes>
                        <AboutIconLink/>

                    </div>            
            </Router>
        </FeedbackProvider>
    )
}

export default App;
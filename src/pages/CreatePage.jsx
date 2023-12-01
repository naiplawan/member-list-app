import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm.jsx";
import { Fade } from 'react-awesome-reveal';


function CreatePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center text-center w-screen h-screen p-10">
            <Fade >
            <div className="text-5xl">Create Page</div>
            </Fade>
            <CreatePostForm  />
            <Button variant="contained" onClick={() => navigate('/')} >Back to Home</Button>
        </div>
    )
}

export default CreatePage

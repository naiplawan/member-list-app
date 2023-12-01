import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";
import { Fade } from 'react-awesome-reveal';



function EditPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center text-center w-screen h-screen p-10">
            <Fade >
            <div className="text-5xl">Edit  Page</div>
            </Fade>
            <EditPostForm />
            <Button variant="contained" onClick={() => navigate('/')} >Back to Home</Button>
        </div>
    )
}

export default EditPage


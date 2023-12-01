import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import supabase from "../supabase.js";
import dayjs from "dayjs";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function CreatePostForm() {
  const [data, setData] = useState(null);
  const Mr = "Mr";
  const Mrs = "Mrs";
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [aboutme, setAboutme] = useState("");
  const navigate = useNavigate();

  
  const handleCreate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
        .from("personalinformation")
        .insert({
            
            title: title,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            birthdate: birthdate,
            aboutme: aboutme,
        })
        .select();
        navigate('/');
        console.log("Data to Create",data);
    if (error) console.log(error);
    else console.log(data);
    };

  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-screen bg-slate-300 text-xs m-10">
      <FormControl sx={{ m: 5, minWidth: 120 }} size="large">
        <InputLabel id="form-label">Title</InputLabel>
        <Select
          labelId="title-label"
          id="title"
          intital={data?.title}
          value={title}
          label="title"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "10px"}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={Mr}>Mr</MenuItem>
          <MenuItem value={Mrs}>Mrs</MenuItem>
        </Select>

        <TextField
          id="firstname"
          label="First Name"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />

        <TextField
          id="lastname"
          label="Last Name"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="mb-5"
        />

        <div className="p-5">
          <FormLabel sx={{ fontSize: "2xl" }}>Gender</FormLabel>
          <RadioGroup
            name="radio-buttons-group"
            className="p-5"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <Radio value="female" label="Female" />
            <Radio value="male" label="Male" />
            <Radio value="other" label="Other" />
          </RadioGroup>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ marginBottom: "20px" }}
          >
            <DatePicker
              label="Birthday"
              value={dayjs(birthdate)}
              onChange={(newValue) => {
                setBirthdate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          id="aboutme"
          label="About Me"
          type="text"
          value={aboutme}
          onChange={(e) => setAboutme(e.target.value)}
          multiline rows={4}
        />
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        endIcon={<AddIcon/>}
        size="large"
        sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black' } , marginBottom: "20px"}}
        onClick={handleCreate}
      >
        Create
      </Button>
    </div>
  );
}

export default CreatePostForm;

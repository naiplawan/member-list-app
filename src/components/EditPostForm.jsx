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
import { useEffect } from "react";
import supabase from "../supabase.js";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

function EditPostForm() {
  const [data, setData] = useState(null);
  const Mr = "Mr";
  const Mrs = "Mrs";
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [aboutme, setAboutme] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("personalinformation")
        .select("*")
        .eq("id", id);
      if (error) console.log(error);
      else {
        const item = data[0];
        setData(item);
        setTitle(item.title);
        setFirstname(item.firstname);
        setLastname(item.lastname);
        setGender(item.gender)
        setBirthdate(new Date(item.birthdate));
        setAboutme(item.aboutme);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
        .from("personalinformation")
        .update({
            title: title,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            birthdate: birthdate,
            aboutme: aboutme,
        })
        .eq("id", id)
        .select();
    if (error) console.log(error);
    else console.log(data);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("personalinformation")
            .delete()
            .eq("id", id)
            .select();
            navigate('/');
        if (error) console.log(error);
        else console.log(data);
        };

  console.log("data by ID", data);

  return (
    <div className="flex flex-col justify-center items-center text-center w-full h-screen bg-slate-300 text-xs m-10">
      <FormControl sx={{ m: 5, minWidth: 120, }} size="large">
        <InputLabel id="form-label">Title</InputLabel>
        <Select
          labelId="title-label"
          id="title"
          intital={data?.title}
          value={title}
          label="title"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "10px" }}
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
      <div className="flex flex-row justify-evenly w-full mb-5"> 
      <Button
        variant="contained"
        type="submit"
        endIcon={<ArrowCircleUpIcon />}
        size="large"
        className="mr-5"
        onClick={handleUpdate}
        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
      >
        Update
      </Button>

      <Button
        variant="contained"
        endIcon={<DeleteIcon />}
        size="large"
        onClick={handleDelete}
        sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
      >
        Delete
      </Button>
    </div>
    </div>
  );
}

export default EditPostForm;

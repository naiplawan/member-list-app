import { useState, useEffect } from 'react';
import supabase from "../supabase.js";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("personalinformation")
      .select("*");
    if (error) console.log(error);
    else setData(data);
  };

    const handleClick = (id) => {
        navigate(`/edit/${id}`);
    }
 
  return (
    <>
    <div className="flex flex-col justify-center items-center text-center w-screen h-screen p-5">
      <div className="text-5xl m-5">Member List</div>
      <TableContainer component={Paper} sx={{ marginBottom: '15px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '16px' }}>ID</TableCell>
              <TableCell sx={{ fontSize: '16px' }}>Title</TableCell>
              <TableCell sx={{ fontSize: '16px' }}>First Name</TableCell>
              <TableCell sx={{ fontSize: '16px' }}>Last Name</TableCell>
              <TableCell sx={{ fontSize: '16px' }}>Gender</TableCell>
              <TableCell sx={{ fontSize: '16px' }}>Birthdate</TableCell>
              <TableCell sx={{ fontSize: '16px' }}>About Me</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} onClick={() => handleClick(row.id)}>
                <TableCell sx={{ fontSize: '16px' }}>{row.id}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{row.title}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{row.firstname}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{row.lastname}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{row.gender}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{row.birthdate}</TableCell>
                <TableCell sx={{ fontSize: '16px' }}>{row.aboutme}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={() => navigate('/create')} sx={{ fontSize: '16px' }} >Create New Member</Button>
    </div>
  </>
);

}

export default HomePage;

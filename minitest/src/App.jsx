import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default function () {
  const [listJob, setListJob] = useState([]);
  const [flag, setFlag] = useState(0);
  const [bntCheck, setBntCheck] = useState(false);
  const callApi = async () => {
    const res = await axios.get("http://localhost:3000/jobs");
    setListJob(res.data.data);
  };
  useEffect(() => {
    callApi();
  }, [flag]);
  const [job, setjob] = useState({
    nameJob: "",
    id: Math.floor(Math.random() * 9999999999),
    status: "cancel",
  });
  const handlechange = (e) => {
    setjob({ ...job, nameJob: e.target.value });
  };
  const addJob = async () => {
    if (job.nameJob === "") {
      alert("khong duoc de trong");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/jobs", job);
      setFlag(flag + 1);
      setjob({
        nameJob: "",
        id: Math.floor(Math.random() * 9999999999),
        status: "cancel",
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const deleteJob = async (item) => {
    let check = confirm("ban co muon xoa khong");
    if (check) {
      try {
        const res = await axios.delete(`http://localhost:3000/jobs/${item.id}`);
        setFlag(flag + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const editJob = async (item) => {
    const check = confirm("Bạn muốn sửa công việc này?");
    if (check) {
      setBntCheck(true);
      setjob(item);
    }
  };
  const edit = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/jobs/${job.id}`, job);
      setjob({
        nameJob: "",
        id: Math.floor(Math.random() * 9999999999),
        status: "cancel",
      });
      setBntCheck(false);
      setFlag(flag + 1);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const cleanAll = async () => {
    let check = confirm("ban co muon xoa het khong");
    if (check) {
      try {
        const res = await axios.delete("http://localhost:3000/jobs");
        setFlag(flag + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const changeCheckbox = async (e) => {
    const check = confirm("Bạn đã hoàn thành công việc này?");
    if (check) {
      let a = listJob.findIndex((item) => item.id == e.target.value);
      console.log(a);
      console.log(e.target.checked);
      if (e.target.checked == true) {
        console.log(111111);
        console.log(listJob[a]);
        listJob[a].status = "ok";
        const res = await axios.put("http://localhost:3000/jobs", listJob);
        setFlag(flag + 1);
      }
    }else{
      e.target.checked=false
    }
    console.log(e.target.checked)
  };
  return (
    <div
      style={{ backgroundColor: "rgb(91,186,216", padding: 30, height: 2000 }}
    >
      <div
        style={{
          width: 600,
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: 20 }}>List Todo</h1>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
            marginTop: 20,
            width: 550,
            marginLeft: 25,
          }}
        >
          <Form.Control
            type="text"
            placeholder="Normal text"
            onKeyDown={(e) => (e.key === "Enter" ? addJob() : null)}
            onChange={handlechange}
            name="nameJob"
            value={job.nameJob}
          />
          {bntCheck ? (
            <Button
              onClick={edit}
              variant="danger"
              style={{ fontSize: 20, fontWeight: 700 }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="success"
              style={{ fontSize: 20, fontWeight: 700 }}
              onClick={addJob}
            >
              Add
            </Button>
          )}
        </div>
        {listJob?.map((item, key) => {
          return (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 550,
                margin: "0 auto",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  textDecoration: `${
                    item.status == "ok" ? "line-through" : "none"
                  }`,
                }}
              >
                {item.nameJob}
              </p>
              <div
                style={{
                  width: 150,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    visibility: `${
                      item.status == "ok" ? "hidden" : "visbility"
                    }`,
                  }}
                  onChange={changeCheckbox}
                  value={item.id}
                />
                <Button
                  onClick={() => editJob(item)}
                  style={{
                    visibility: `${
                      item.status == "ok" ? "hidden" : "visbility"
                    }`,
                  }}
                  variant="warning"
                >
                  {" "}
                  <img
                    width={30}
                    src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png"
                    alt=""
                  />
                </Button>
                <Button onClick={() => deleteJob(item)} variant="dark">
                  <img
                    width={30}
                    src="https://cdn.icon-icons.com/icons2/1880/PNG/96/iconfinder-trash-4341321_120557.png"
                    alt=""
                  />
                </Button>
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 550,
            margin: "0 auto",
            paddingBottom: 20,
          }}
        >
          <p>You Have {listJob?.length} pending task</p>
          <Button onClick={cleanAll} variant="dark">
            CLEAN ALL
          </Button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { List, Input, DatePicker } from "antd";
import { ReactComponent as PlusIcon } from "../../../../public/images/plus.svg";
import { Mesg, FailedMesg, SuccessMesg } from "../../../../API/APIMessage";
import { LoadData, addData } from "../../../../API";
import { CustomInput, InputLable } from "../../../shared/SharedStyle";
import { ReactComponent as DatePickerIcon } from "../../../../public/images/solid calendar-alt.svg";
import styled from "styled-components";
import { Divider } from "./index";
import { Scrollbars } from "react-custom-scrollbars";

function Index() {
  const [ShowCreate, setShowCreate] = useState("");
  const [Loading, setLoading] = useState(false);
  const [user, setusers] = useState("");
  const [data, setData] = useState();
  const [option, setOption] = useState([]);
  const CreateUser = (value) => {
    setShowCreate(value);
  };

  const FilterInput = (e) => {
    let value = e.target.value;
    let temp = [];
    let newData;
    if (value) {
      newData = data
        ? data.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        : [];

      newData.map((i) => {
        temp.push(i);
      });
    }

    setOption(temp.slice(0, 5));
    console.log(newData);
  };
  useEffect(() => {
    LoadData(
      "users",
      (err, data) => {
        setLoading(false);
        if (err) {
          Mesg(err);
        } else {
          setData(data.data.rows);
        }
      },
      (err) => {
        setLoading(false);
        // Progress.hide();
        FailedMesg(err, "Something worng happend !");
      }
    );
  }, []);
  const [values, setValues] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("");
  const [ShowForm, setShowForm] = useState("");
  const OnItem = (item) => {
    console.log(item);

    setShowCreate(true);
    setValues(item.name);
    setemail(item.email);
    setphone(item.phone);
    setgender(item.sex);
    setaddress(item.address);
  };
  const InputGroup = styled.div`
    display: grid;
    gap: 15px;
    padding: 10px 0;
    grid-template-columns: ${(props) =>
      props.row1
        ? "0.5fr 0.5fr 1fr"
        : (props) =>
            props.row2
              ? "1fr 1fr"
              : (props) => (props.row3 ? "1fr 0.3fr" : "1fr 1fr")};
  `;
  const CreateBtn = styled.div`
    display: flex;
    gap: 5px;
    cursor: pointer;
    align-items: cneter;
  `;
  const ListItem = styled.div`
    color: var(--darkGray);
    padding: 7px;
    cursor: pointer;
    border-bottom: 1px solid var(--lightGray);
  `;

  return (
    <div className="modleWrapper">
      <div>Search by full name , email and phone number</div>
      <Divider />
      {ShowCreate ? (
        ""
      ) : ShowForm ? (
        ""
      ) : (
        <List
          style={{ borderRadius: "10px" }}
          locale={{
            emptyText: <div></div>,
          }}
          header={
            <CustomInput
              onChange={(e) => FilterInput(e)}
              style={{ width: "100%" }}
              search={true}
            />
          }
          footer={
            <CreateBtn onClick={() => setShowForm(true)}>
              <PlusIcon style={{ marginTop: "5px" }} />
              Create New Costumer
            </CreateBtn>
          }
          bordered
          dataSource={option}
          renderItem={(item) => (
            <ListItem onClick={() => OnItem(item)}>{item.name}</ListItem>
          )}
        />
      )}
      {ShowCreate ? (
        <div>
          <CustomInput placeholder="" value={values} />

          <div>
            <InputGroup row1={true}>
              <InputLable
                placeholder="Andrew"
                onChange={(e) => setValues(e.target.value)}
                value={values}>
                Fist Name
                <CustomInput
                  onChange={(e) => setValues(e.target.value)}
                  value={values}
                />
              </InputLable>
              <InputLable>
                Last Name
                <CustomInput
                  //   placeholder="Morton"
                  onChange={(e) => setValues(e.target.value)}
                  value={values}
                />
              </InputLable>
              <InputLable>
                Phone Number
                <CustomInput
                  placeholder="(123)456-7890"
                  onChange={(e) => setphone(e.target.value)}
                  value={phone}
                />
              </InputLable>
            </InputGroup>
            <InputGroup row2={true}>
              <InputLable>
                Email
                <CustomInput
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  placeholder="Customer e-mail"
                />
              </InputLable>
              <InputLable>
                Brith Date
                <div style={{ display: "flex", position: "relative" }}>
                  <DatePicker
                    placeholder="DD / MM / YYYY"
                    style={{ width: "100%" }}
                    // onChange={(e) => handleDate(e)}
                  />
                  <span className="datePickerIcon">
                    <DatePickerIcon />
                  </span>
                </div>
              </InputLable>
            </InputGroup>
            <InputGroup row3={true}>
              <InputLable>
                Address
                <CustomInput
                  placeholder="Customer address"
                  onChange={(e) => setaddress(e.target.value)}
                  value={address}
                />
              </InputLable>
              <InputLable>
                Gender
                <CustomInput
                  placeholder="Male"
                  onChange={(e) => setgender(e.target.value)}
                  value={gender}
                />
              </InputLable>
            </InputGroup>
          </div>
        </div>
      ) : null}
      {ShowForm ? (
        <div>
          <CustomInput placeholder="" value={values} />

          <div>
            <InputGroup row1={true}>
              <InputLable
                placeholder="Andrew"
                // onChange={(e) => setValues(e.target.value)}
                // value={values}
              >
                Fist Name
                <CustomInput
                //   onChange={(e) => setValues(e.target.value)}
                //   value={values}
                />
              </InputLable>
              <InputLable>
                Last Name
                <CustomInput
                  placeholder="Morton"
                  //   onChange={(e) => setValues(e.target.value)}
                  //   value={values}
                />
              </InputLable>
              <InputLable>
                Phone Number
                <CustomInput
                  placeholder="(123)456-7890"
                  //   onChange={(e) => setphone(e.target.value)}
                  //   value={phone}
                />
              </InputLable>
            </InputGroup>
            <InputGroup row2={true}>
              <InputLable>
                Email
                <CustomInput
                  //   onChange={(e) => setemail(e.target.value)}
                  //   value={email}
                  placeholder="Customer e-mail"
                />
              </InputLable>
              <InputLable>
                Brith Date
                <div style={{ display: "flex", position: "relative" }}>
                  <DatePicker
                    placeholder="DD / MM / YYYY"
                    style={{ width: "100%" }}
                    // onChange={(e) => handleDate(e)}
                  />
                  <span className="datePickerIcon">
                    <DatePickerIcon />
                  </span>
                </div>
              </InputLable>
            </InputGroup>
            <InputGroup row3={true}>
              <InputLable>
                Address
                <CustomInput
                  placeholder="Customer address"
                  //   onChange={(e) => setaddress(e.target.value)}
                  //   value={address}
                />
              </InputLable>
              <InputLable>
                Gender
                <CustomInput
                  placeholder="Male"
                  //   onChange={(e) => setgender(e.target.value)}
                  //   value={gender}
                />
              </InputLable>
            </InputGroup>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;

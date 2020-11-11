import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { BiExport, BiDollar } from "react-icons/bi";
import Reservation from "./Reservation";
import Statistic from "./Statistic";
import { AiOutlinePlus } from "react-icons/ai";
import { Col, Row, Input, Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { CustomButton } from "../shared/SharedComponents";
import "../../App.css";
import FullCalendar from "@fullcalendar/react";
import { Modal } from "react-responsive-modal";
import { LoadData } from "../../API";
import { ReactComponent as PrintIcon } from "../../public/images/print.svg";
import { Data } from "../../fakeData/DashFakeData";
import NewBooking from "../Booking/NewBooking";
import dayGridPlugin from "@fullcalendar/daygrid";
import { RiArrowDropDownLine } from "react-icons/ri";
import Tooltip from "react-tooltip";
import { SuccessMesg, FailedMesg, Mesg } from "../../API/APIMessage";
import { SmileOutlined } from "@ant-design/icons";
import {
  CustomPageWrapper,
  PageContent,
  PageTitle,
  PageBtn,
  ButtonGroup,
} from "../shared/CustomPage";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
body{
  background-color:var(--lightGray)
}

`;

const menu = (
  <Menu>
    <Menu.Item>
      <a>Next month</a>
    </Menu.Item>
    <Menu.Item>
      <a>Previous month</a>
    </Menu.Item>
  </Menu>
);

export const Widget = styled.div`
  background-color: white;
  border-radius: 7px;
  border: 1px solid var(--lighterGray);
  display: flex;
  padding: 17px 17px 8px 17px;

  width: 100%;
  flex-direction: column;
`;

const Clander = styled.div`
  background-color: white;
  border-radius: 7px;
  padding: 15px 25px;
  height: 100%;
  margin-bottom: 20px;
  border: 1px solid var(--lighterGray);
`;
const List = styled.div`
  color: #3b86ff;
  display: flex;
  align-items: cneter;
  margin-top: 4px;
`;
const SearchInput = styled(Input)`
  border-radius: 6px;
  border: 1px solid var(--lighterGray);
  height: 30px;
  color: var(--lighterGray);
  width: 300px;
`;
const PageHeader = styled(Row)`
  align-items: center;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function Booking() {
  const onEnter = (item) => {
    let data;
    let color = item.event._def.ui.backgroundColor.replace(/^"(.*)"$/, "$1");

    item.event._def.extendedProps.data.map((item) => (data = item));
    let node = document.createElement("div");
    let DayWrap = document.createElement("div");
    let TimeWrap = document.createElement("div");
    let TitleWrap = document.createElement("div");
    DayWrap.setAttribute("id", "flex-col");
    TimeWrap.setAttribute("id", "flex-col");
    TitleWrap.setAttribute("id", "flex-col");
    let day = document.createElement("div");
    let date = document.createElement("div");
    let titleLable = document.createElement("div");
    let title = document.createElement("div");
    let timeLable = document.createElement("div");
    let time = document.createElement("div");
    title.style.color = `${color}`;
    node.setAttribute("id", "pupup");
    item.el.setAttribute("id", "holder");

    if (item.el.id === "holder") {
      node.style.border = `1px solid ${color}`;

      day.innerHTML = `${data.day}`;
      date.innerHTML = `${data.date}`;
      title.innerHTML = `${data.title}`;
      titleLable.innerHTML = `Event Title`;
      time.innerHTML = `${data.time}`;
      time.style.color = "black";
      timeLable.innerHTML = `Time`;
      DayWrap.appendChild(day);
      DayWrap.appendChild(date);
      TitleWrap.appendChild(titleLable);
      TitleWrap.appendChild(title);
      TimeWrap.appendChild(timeLable);
      TimeWrap.appendChild(time);
      node.appendChild(DayWrap);
      node.appendChild(TitleWrap);
      node.appendChild(TimeWrap);

      item.el.appendChild(node);
      console.log(item.el);
    }
  };
  const onLeave = (item) => {
    if (document.getElementById("pupup")) {
      item.el.removeChild(document.getElementById("pupup"));
    } else {
    }
    return item;
  };
  const [open, setOpen] = useState(false);
  const onOpenModal = (open) => {
    setOpen(open);
  };

  useEffect(() => {
    // LoadData(null, (data) => console.log(data, "our first get"), null);
  });
  return (
    <CustomPageWrapper>
      <GlobalStyle />
      <SideBar />
      <PageContent>
        <PageHeader>
          <PageTitle>Dashboard</PageTitle>
          <Button onClick={() => Mesg("bottomRight")}>sucss</Button>
          {/* <Button onClick={() => FailedMesg("bottomRight")}>go</Button> */}{" "}
          <span style={{ marginTop: "20px", color: "var(--darkGray)" }}>
            Welcome Back, <h8 style={{ color: "black" }}>Marwa!</h8>
          </span>
        </PageHeader>
        <Row>
          <PageBtn>
            <ButtonGroup space>
              <Dropdown overlay={menu}>
                <List>
                  <span>This Month</span>

                  <RiArrowDropDownLine size="25px" />
                </List>
              </Dropdown>
              <SearchInput placeholder="Advanced Search" />
            </ButtonGroup>
            <ButtonGroup>
              <CustomButton lable="Print">
                <PrintIcon />
              </CustomButton>
              <CustomButton Main onOpen={onOpenModal} lable="New Booking">
                <AiOutlinePlus />
              </CustomButton>
            </ButtonGroup>
          </PageBtn>
        </Row>

        <Row
          style={{
            display: "grid",
            gap: "25px",
            gridTemplateColumns: "2fr 0.7fr",
          }}
        >
          <Col
            style={{
              height: "auto",
            }}
          >
            <Clander>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="700px"
                eventMouseEnter={(item) => onEnter(item)}
                eventMouseLeave={(item) => onLeave(item)}
                events={Data}
              />
            </Clander>
          </Col>
          <Col style={{ height: "100%" }}>
            <Reservation />
            <div style={{ height: "3%" }}></div>
            <Statistic />
          </Col>
        </Row>
      </PageContent>
      <Modal
        closeOnOverlayClick={false}
        open={open}
        onClose={() => onOpenModal(false)}
        center
        showCloseIcon={false}
        classNames={{
          modal: "customModal",
        }}
      >
        <NewBooking from="Dashboard" Close={() => onOpenModal(false)} />
      </Modal>
    </CustomPageWrapper>
  );
}

export default Booking;

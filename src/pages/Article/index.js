import React from "react";
// import ArticlesColumns from "./Config.js";
import { ArticlesData } from "../../fakeData";
import CustomPage from "../shared/CustomPage";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { UserImage } from "../Sidebar";
import { Checkbox } from "antd";
import styled from "styled-components";
const ArticleImage = styled.img`
  width: 55px;
  height: 50px;
  border-radius: 4px;
`;
const ArticlesColumns = [
  {
    key: "1",
    title: "",
    dataIndex: "",
    render: () => <Checkbox />,
  },
  {
    key: "2",
    title: "",
    dataIndex: "image",

    render: (theImageURL) => (
      <div style={{ width: "50px" }}>
        <ArticleImage
          alt={theImageURL}
          src={require("../../public/images/event_1.png")}
        />
      </div>
    ),
  },
  {
    key: "3",
    title: "Title",
    dataIndex: "Title",
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    key: "4",
    title: "Created Date",
    dataIndex: "CreatedDate",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },

  {
    key: "5",
    title: "Created by",
    dataIndex: "Createdby",
    render: (theImageURL) => (
      <div style={{ width: "50px" }}>
        <UserImage
          alt={theImageURL}
          src={require("../../public/images/user2.png")}
        />
      </div>
    ),
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    key: "6",
    title: "",
    dataIndex: "",
    render: () => (
      <BiDotsVerticalRounded
        style={{ fontSize: "20px", color: "var(--lighterGray)" }}
      />
    ),
  },
];
class Aritcle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <CustomPage
        pageTitle="Articles"
        columns={ArticlesColumns}
        data={ArticlesData}
      />
    );
  }
}

export default Aritcle;

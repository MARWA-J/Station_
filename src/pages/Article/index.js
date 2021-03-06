// Aritcle page //

import React, { useState, useEffect, useHistory } from "react";
import ArticlesColumns, { ArticlesData } from "./Config.js";
// import { ArticlesData } from "../../fakeData";
import CustomPage from "../shared/CustomPage";
import { DateName } from "../Dashboard";

import "react-responsive-modal/styles.css";
import { Mesg, FailedMesg } from "../../API/APIMessage";
import { LoadData } from "../../API";
import { monthNames } from "../shared/assets";
function Aritcle(props) {
  const [Loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  // let history = useHistory();
  const loadArticle = () => {
    setLoading(true);
    LoadData(
      "articles",
      (err, data) => {
        if (err) {
          Mesg(err);
          setLoading(false);
        } else {
          setLoading(false);
          let Articles = [];
          data.data.rows.map((item) => {
            Articles.push({
              image: item.image,
              Title: item.title,
              CreatedDate: DateName(item.createdAt),
              Createdby: props.admins
                .filter((i) => i.id === item.adminId)
                .map((i) => i.username)
                .toString(),
            });
          });

          setdata(Articles);
          setFilterdata(Articles);
        }
      },
      (err) => {
        setLoading(false);
        FailedMesg(err, "Something worng happend !");
        console.log(err, "failed");
      }
    );
  };
  const [FilterdData, setFilterdData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("station_token")) {
      loadArticle();
    } else {
      props.history.push("/login");
    }
  }, []);
  const [searchText, setsearchText] = useState("");

  const HandleSearch = (e) => {
    let value = e.target.value;
    setsearchText(value);
    if (value) {
      setFilterdata(data);
    }
  };

  const Filter = () => {
    let newData = data.filter((item) =>
      item.Title.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(data, searchText);

    setFilterdata(newData);
  };
  const onOpen = (value) => {
    props.history.push("/");
  };

  return (
    <div>
      <CustomPage
        pageTitle="articles"
        columns={ArticlesColumns}
        Item="aritcle"
        Loading={Loading}
        data={Filterdata}
        onOpenModal={() => props.history.push("/createarticle")}
        HandleSearch={HandleSearch}
        filter={Filter}
      />
    </div>
  );
}

export default Aritcle;

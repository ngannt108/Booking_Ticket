import { Button, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function DanhGia() {
  const classes = useStyles();

  const [items, setItems] = useState(getLocalItems());
  const [input, setInput] = useState("");

  console.log(input);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
    } else {
      setItems([...items, input]);
      setInput("");
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <Container style={{ background: "#fff" }}>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%" }}
            id="outlined-basic"
            label="Bình luận"
            variant="outlined"
            value={input}
          />
          <Button type="submit" variant="contained" color="secondary">
            Đăng
          </Button>
        </form>
        <div>
          {items.map((item, index) => {
            return (
              <div key={index}>
                <p style={{ color: "black" }}>{item}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default DanhGia;

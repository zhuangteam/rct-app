import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  Snackbar,
} from "@material-ui/core";
import {
  AccountCircle,
  Close,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import Axios from "axios";

import "./login.scss";

function login(username: string, password: string) {
  return Axios.get("/api/login.json", { params: { username, password } });
}

export default function Login() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="login">
      <FormControl fullWidth variant="outlined">
        <InputLabel>账号</InputLabel>
        <OutlinedInput
          endAdornment={<AccountCircle />}
          labelWidth={30}
          rowsMax={6}
          onChange={(event) =>
            setAccount({ ...account, username: event.target.value })
          }
        />
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel>密码</InputLabel>
        <OutlinedInput
          type={visible ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="显示/隐藏密码"
                onClick={() => setVisible(!visible)}
                onBlur={() => setVisible(false)}
                edge="end"
              >
                {visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={30}
          rowsMax={6}
          onChange={(event) =>
            setAccount({ ...account, password: event.target.value })
          }
        />
      </FormControl>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          login(account.username, account.password).then((rsp) => {
            const data = rsp.data;
            if (
              data.code === 0 &&
              JSON.stringify(data.data) === JSON.stringify(account)
            ) {
              setSuccess(true);
            }
          });
        }}
      >
        登录
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        action={
          <React.Fragment>
            <IconButton
              aria-label="关闭"
              color="inherit"
              onClick={() => setSuccess(false)}
            >
              <Close />
            </IconButton>
          </React.Fragment>
        }
        message="登录成功"
      />
    </div>
  );
}

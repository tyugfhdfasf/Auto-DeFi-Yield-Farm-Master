import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { useStore } from "../../../../../../store/store";
import { Blockie } from "rimble-ui";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: "Shen Zhi",
    avatar: "/images/avatars/avatar_11.png",
    bio: "Brain Director",
  };

  const store = useStore();

  const shortAddress = (address) => {
    if (address) {
      return address.slice(0, 6) + "..." + address.slice(-4);
    }
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {/* <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      /> */}
      <Blockie
        opts={{
          seed: store.state.account,
          color: "#dfe",
          bgcolor: "#a71",
          size: 15,
          scale: 3,
          spotcolor: "#000",
        }}
      />
      <Typography className={classes.name} variant="h4">
        Main account
      </Typography>
      <Typography variant="body2">
        {shortAddress(store.state.account)}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

// Helpers
import { CitiesColombia, Colors } from "../helpers/scripts";
// import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdEventAvailable } from "react-icons/md";

export default function CreateEvent(props) {
  const isCreate = props.isCreate;

  const [updateInfo, setUpdateInfo] = useState({
    startTime: new Date(),
    endTime: new Date(),
    locate: "",
    name: "",
    color: "",
    date: new Date(),
    description: "",
    _id: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ updateInfo });

  useEffect(async () => {
    if (props.match.params.id) {
      const res = await axios.get(
        `http://localhost:5000/api/events/edit/${props.match.params.id}`
      );
      console.log(res.data.body.date);
      setUpdateInfo({
        name: res.data.body.name,
        description: res.data.body.description,
        locate: res.data.body.locate,
        color: res.data.body.color,
        date: new Date(res.data.body.date),
        startTime: res.data.body.startTime,
        endTime: res.data.body.endTime,
      });
    }
  }, []);

  const onSubmit = async (values, e) => {
    e.preventDefault();
    const {
      startTime,
      endTime,
      locate,
      name,
      color,
      date,
      description,
    } = values;
    const newValues = {
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      locate: locate,
      name: name,
      color: color,
      date: date.toISOString().substr(0, 10),
      description: description,
    };
    if (!isCreate) {
      await axios.put(
        `http://localhost:5000/api/events/${props.match.params.id}`,
        newValues
      );
    } else {
      let config = {
        method: "post",
        url: "http://localhost:5000/api/events",
        headers: {
          "Content-Type": "application/json",
        },
        data: newValues,
      };
      try {
        const response = await axios(config);
        if (response === 201) {
          reset();
        }
      } catch (error) {
        console.log(error);
        toast.error("Internal Error 500");
      }
    }
    window.location.href = "/";
  };
  const OnChangeValues = (e) => {
    setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
  };
  return (
    <div className="container p-4">
      <h1 className="text-center">
        Create Event <MdEventAvailable />
      </h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                {...register("name", { required: true })}
                onChange={(e) => OnChangeValues(e)}
                className="form-control"
                placeholder="Name"
                autoFocus
                value={updateInfo.name}
              />
            </div>
            <span className="text-danger text-sm py-2">
              {errors.name && "You must enter Name"}
            </span>

            <div className="form-group mb-2">
              <select
                {...register("locate", { required: true })}
                id="citieSelected"
                onChange={(e) => OnChangeValues(e)}
                className="form-control"
                value={updateInfo.locate}
              >
                {CitiesColombia.map((city, key) => (
                  <option value={city} key={key}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-danger text-sm py-2">
              {errors.locate && "You must enter Locate"}
            </span>

            <div className="form-group mb-2">
              <select
                {...register("color")}
                id="colorSelected"
                className="form-control"
                onChange={(e) => OnChangeValues(e)}
                value={updateInfo.color}
              >
                {Colors.map((color, key) => (
                  <option value={color} key={key}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-2">
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <DatePicker
                    className="form-control"
                    onChange={onChange}
                    selected={value}
                    onBlur={onBlur}
                    placeholderText="Select your Day!"
                    value={updateInfo.date}
                  />
                )}
              />
            </div>
            <span className="text-danger text-sm py-2">
              {errors.date && "You must enter a Date"}
            </span>

            <div className="form-group mb-2">
              <Controller
                control={control}
                name="startTime"
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <DatePicker
                    className="form-control"
                    selected={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select your Start Time!"
                    // value={moment(updateInfo.startTime).format("LT")}
                  />
                )}
              />
            </div>
            <span className="text-danger text-sm py-2">
              {errors.startTime && "You must enter a Start Time"}
            </span>

            <div className="form-group mb-2">
              <Controller
                control={control}
                name="endTime"
                rules={{ required: true }}
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <DatePicker
                    className="form-control"
                    selected={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select your End Time!"
                    // value={moment(updateInfo.endTime).format("LT")}
                  />
                )}
              />
            </div>
            <span className="text-danger text-sm py-2">
              {errors.endTime && "You must enter a end Time"}
            </span>

            <div className="form-group mb-2">
              <textarea
                type="text"
                {...register("description")}
                className="form-control"
                placeholder="Description"
                onChange={(e) => OnChangeValues(e)}
                value={updateInfo.description}
              />
            </div>
            <div className="row">
              <div className="col d-flex justify-content-between">
                {isCreate ? (
                  <button className="btn btn-primary" type="submit">
                    Create
                  </button>
                ) : (
                  <button className="btn btn-secondary" type="submit">
                    Update
                  </button>
                )}
                <Link className="btn btn-danger mb-2" to="/">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

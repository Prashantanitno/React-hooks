import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const GENDER_OPTIONS = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "Others", value: "other" },
];

const MAX_FILE_SIZE = 102400; //100KB

const validFileExtensions = {
  //   image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  image: ["jpg", "gif", "png"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("first Name is required"),
    lastName: yup.string().required("last Name is required"),
    gender: yup.string().required("Gender is required"),
    phone: yup.number().required("Phone number is required"),
    email: yup
      .string()
      .email("This must be a email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "The password must be six characters"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .min(6, "The password must be six characters")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
    fileUpload: yup
      .mixed()
      .required(" Image is Required")
      .test("is-valid-type", "Not a valid image type", (value) => {
        console.log("value -> ", value);
        isValidFileType(value && value[0]?.name?.toLowerCase(), "image");
      })
      .test(
        "is-valid-size",
        "Max allowed size is 100KB",
        (value) => value && value[0]?.size <= MAX_FILE_SIZE
      ),
    minCash: yup
      .number()
      .required("minCash is required ")
      .test(
        "minCash is invalid",
        "Min should be less than the maxCash ",
        function (minCash) {
          console.log("reference -> ", this.parent.maxCash);
          const maxCash = this.parent.maxCash;

          if (minCash !== undefined && maxCash !== undefined) {
            return minCash <= maxCash;
          }
          return true;
        }
      ),
    maxCash: yup.number().required("maxfield is required "),
  })
  .required();

const UserRegisterationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    // mode: "onBlur",
    mode: "onChange", // Set the mode to "onChange"
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    console.log("values --> ", values);
  };

  // ------->   2 types of validation
  //  1. by default with useForm
  //  2. by yup validation

  useEffect(() => {
    const payload = [
      {
        name: "firstName",
        value: "rohan",
      },
      {
        name: "lastName",
        value: "verma",
      },
    ];
    payload.map(({ name, value }) => setValue(name, value));
    // setValue("firstName", "rohan");
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>User Registration Form</h3>

        {/*  firstName */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            {...register("firstName")}
            // {...register("firstName", {
            //   required: true,
            // })}
          />
          {errors.firstName && (
            <span className="field_level_error">
              {errors.firstName.message}{" "}
            </span>
          )}
        </div>

        {/*  LastName */}

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="field_level_error">
              {errors.lastName.message}{" "}
            </span>
          )}
        </div>

        {/*  Gender */}

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select className="form-control" {...register("gender")}>
            {GENDER_OPTIONS.map((options, index) => (
              <option key={index} value={options.value}>
                {options.text}
              </option>
            ))}
          </select>
          {errors.gender && (
            <span className="field_level_error">{errors.gender.message} </span>
          )}
        </div>

        {/*  Email */}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" {...register("email")} />
          {errors.email && (
            <span className="field_level_error">{errors.email.message} </span>
          )}
        </div>

        {/*  Phone */}

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            min="0"
            max="99999"
            className="form-control"
            {...register("phone")}
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 10);
            }}
          />
          {errors.phone && (
            <span className="field_level_error">{errors.phone.message} </span>
          )}
        </div>

        {/*  Password */}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && (
            <span className="field_level_error">
              {errors.password.message}{" "}
            </span>
          )}
        </div>

        {/*  Confirm Password */}

        <div className="form-group">
          <label htmlFor="confirmPassword">Cofirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="field_level_error">
              {errors.confirmPassword.message}{" "}
            </span>
          )}
        </div>

        {/*  Image upload  */}

        <div className="input-group mb-3">
          <label htmlFor="fileUpload" className="input-group-text">
            Upload
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            {...register("fileUpload")}
          />
          {errors.fileUpload && (
            <span className="field_level_error">
              {errors.fileUpload.message}
            </span>
          )}
        </div>

        <div>
          <div className="form-group  ">
            <label htmlFor="minCash">Min Cash</label>
            <input
              type="number"
              min="0"
              max="99999"
              className="form-control"
              {...register("minCash")}
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 10);
              }}
            />
            {errors.minCash && (
              <span className="field_level_error">
                {errors.minCash.message}{" "}
              </span>
            )}
          </div>

          <div className="form-group  ">
            <label htmlFor="maxCash">Max Cash</label>
            <input
              type="number"
              min="0"
              max="99999"
              className="form-control"
              {...register("maxCash")}
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 10);
              }}
            />
            {errors.maxCash && (
              <span className="field_level_error">
                {errors.maxCash.message}{" "}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
        <button type="reset" className="btn btn-primary mt-2">
          Reset
        </button>
      </form>
    </div>
  );
};

export default UserRegisterationForm;

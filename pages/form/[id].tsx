import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api, applyJob, fetchJobById, uploadCV } from "../../http";
import { ICategoryAttribute, ICollectionResponse, IJobs } from "../../types";
import { formatDate } from "../../utils";

interface IPropType {
  job: {
    item: any;
  };
}

const JobForm: NextPage<IPropType> = ({ job }) => {

  const Router = useRouter();

  const [data, selectdata] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Qualification: "",
    PreviousExperience: "",
    Resume: "",
    AppliedDesignation: `${job?.item?.attributes?.Title}`,
  });

  const [File, setSelectedFile] = useState<any>(null);

  useEffect(() => {

    const dataSubmit = async() => {

      await applyJob({data})

      Router.push('/')
    }

    dataSubmit();

  {data?.Resume == "" ? "" : alert(`hy ypu have submitted the application for ${job?.item?.attributes?.Title}`)}
    
    
  }, [data?.Resume]);

  const handleChange = (e: any): void => {

    selectdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleSubmit = async (e: any) => {

    let file = new FormData();
    file.append("files", File);
    const response =await uploadCV(file)
    selectdata((prev) => ({ ...prev, Resume: response?.data[0].id }));

  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            {job?.item?.attributes?.Title}
          </h1>
          <p className="leading-relaxed mt-4">
            <span className="font-extrabold text-gray-900">Posted At : </span>
            {formatDate(job?.item?.attributes?.createdAt)}
          </p>
          <p className="leading-relaxed mt-4">
            {job?.item?.attributes?.Description}
          </p>
        </div>
        <div></div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            {job?.item?.attributes?.Title}
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="FullName"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="Phone"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label className="leading-7 text-sm text-gray-600">
              Selected Job
            </label>
            <input
              type="text"
              id="phone"
              name="Phone"
              disabled
              defaultValue={job?.item?.attributes?.Title}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="resume" className="leading-7 text-sm text-gray-600">
              Resume
            </label>
            <input
              type="file"
              id="resume"
              name="file"
              onChange={(e: any) => setSelectedFile(e.target.files[0])}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <div className="flex justify-center">
              <select
                name="Qualification"
                onChange={handleChange}
                className="form-select form-select-sm appearance-none block w-full px-2 py-3 text-sm font-normaltext-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
                          focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                aria-label=".form-select-sm example"
              >
                <option selected>Qualification</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="P.H.D">P.H.D</option>
              </select>
            </div>
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="experience"
              className="leading-7 text-sm text-gray-600"
            >
              Previous Experience
            </label>
            <textarea
              id="experience"
              name="PreviousExperience"
              onChange={handleChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="text-white bg-primary  border-0 py-2 px-8 focus:outline-none hover:bg-sky-700 rounded text-lg"
          >
            Button
          </button>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: any = query.id;
  const { data: job }: AxiosResponse<ICollectionResponse<IJobs[]>> =
    await fetchJobById(id);

  return {
    props: {
      job: {
        item: job.data,
      },
    },
  };
};

export default JobForm;

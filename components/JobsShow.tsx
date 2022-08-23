import { useRouter } from "next/router";
import { IJobs } from "../types";

interface IPropTypes {
  jobs: IJobs[];
}

const JobsShow = ({ jobs }: IPropTypes) => {
    const router = useRouter()
  return (
    <section className="text-gray-600 body-font">
      {jobs.map((job) => (
        <div
          className="container px-5 py-24 mx-auto flex flex-wrap items-center"
          key={job.id}
        >
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              {job?.attributes?.Title}
            </h1>
            <p className="leading-relaxed mt-4">
              {job?.attributes?.Description}
            </p>
          </div>
          <button 
          onClick={() => router.push(`/form/${job.id}`)}
           className="text-white bg-primary border-0 py-2 px-8 focus:outline-none rounded text-lg">
            Apply
          </button>
        </div>
      ))}
    </section>
  );
};

export default JobsShow;

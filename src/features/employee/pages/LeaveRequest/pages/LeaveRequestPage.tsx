import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const LeaveRequestPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="grid grid-cols-12">
          <div className="col-span-1">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="col-span-11 text-center -ml-4 font-semibold text-brown">
            <h2 className="font-semibold">Pengajuan izin</h2>
          </div>
          {/* </div> */}
        </div>
      </section>
    </main>
  );
};

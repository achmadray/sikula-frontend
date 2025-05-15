import { Badge, Divider, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const RequestList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <button
        // onClick={() =>
        //   navigate("/history/data-paid-leave/detail", {
        //     state: { dataPaidLeave: paidLeave[index] },
        //   })
        // }
        onClick={() => navigate("/paid-leave-request/detail")}
        className="bg-white max-w-xs w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2"
      >
        <div className="w-full grid grid-cols-12 pb-2 pt-2 p-4">
          <div className="col-span-2 text-center -ms-3 mt-2">
            <Text size="26px" fw={700}>
              2
            </Text>
            <Text style={{ marginTop: "-5px" }} size="xs">
              Hari
            </Text>
          </div>
          <Divider className="col-span-1" orientation="vertical" />
          <div className="col-span-9 -ml-10">
            <div className="my-auto text-right -mt-3 -me-3">
              <Badge
                size="xs"
                style={{
                  marginTop: "10px",
                  marginLeft: "4px",
                  borderRadius: "2px",
                }}
                color="blue"
              >
                Izin
              </Badge>
              <Badge
                size="xs"
                style={{
                  marginTop: "7px",
                  marginLeft: "7px",
                  borderRadius: "2px",
                }}
                color="red"
              >
                Belum disetujui
              </Badge>
            </div>

            <div className="my-auto text-center ms-2 mt-1">
              <Text size={"md"} fw={700}>
                Kamis, 17 April 2025
              </Text>
            </div>
          </div>
        </div>
        <Divider className="mx-auto" style={{ width: "305px" }} />
        <div className="text-left my-1">
          <Text
            style={{ marginLeft: "0px", padding: "8px" }}
            size="11px"
            fw={500}
          >
            Tanggal pengajuan : Kamis, 17 April 2025
          </Text>
        </div>
      </button>
    </div>
  );
};

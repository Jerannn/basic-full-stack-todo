import useGetTasks from "../hooks/useTasks";
import { useSearchParams } from "react-router-dom";
import TaskCard from "./TaskCard";

import TaskPagination from "./TaskPagination";
import RowsPerPageSelect from "./RowsPerPageSelect";

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 2;

  const { tasks, pagination, isLoading, isError } = useGetTasks({
    page,
    limit,
  });

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    params.set("limit", String(limit));
    setSearchParams(params);
  };

  const setLimit = (limit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", limit);
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div>
      <TaskCard
        data={tasks}
        isLoading={isLoading}
        isError={isError}
        title="Tasks"
      />

      <div className="flex items-center justify-center gap-4 mt-10 ">
        <RowsPerPageSelect value={limit} onChange={setLimit} />
        <TaskPagination
          page={page}
          totalPage={pagination?.totalPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

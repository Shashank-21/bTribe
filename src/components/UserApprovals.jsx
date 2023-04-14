import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { listPendingApprovalUsers } from "../store";
import PendingApprovalCard from "./PendingApprovalCard";

function UserApprovals({ admin, courses }) {
  const { dashboardBgColor } = useSelector((state) => state.color);
  const [
    doListPendingApprovalUsers,
    listPendingApprovalUsersLoading,
    listPendingApprovalUsersError,
  ] = useThunk(listPendingApprovalUsers);

  const pendingApprovalUserList = useSelector(
    (state) => state.user.userApprovalsPending
  );

  useEffect(() => {
    const interval = setTimeout(() => {
      doListPendingApprovalUsers(admin.token);
    }, 1500);
    return () => {
      clearTimeout(interval);
    };
  }, [admin, doListPendingApprovalUsers]);

  return (
    <div
      className={`w-full ${dashboardBgColor}  pb-10 flex flex-col justify-start items-center rounded-b-lg`}
    >
      <h3 className='text-xl font-semibold my-5'>Pending Approvals</h3>
      {!!pendingApprovalUserList?.length &&
        pendingApprovalUserList?.map((pendingApproval) => {
          return (
            <PendingApprovalCard
              key={pendingApproval._id}
              admin={admin}
              pendingApproval={pendingApproval}
              courses={courses}
            />
          );
        })}
      {!pendingApprovalUserList?.length && (
        <div className='bg-inherit h-72 grid place-items-center text-2xl font-semibold text-stone-400'>
          There are no account approvals pending
        </div>
      )}
      {listPendingApprovalUsersLoading && (
        <div className='bg-inherit h-72 grid place-items-center text-2xl font-semibold text-stone-700'>
          Loading pending approvals
        </div>
      )}
      {listPendingApprovalUsersError && (
        <div className='bg-inherit h-72 grid place-items-center text-2xl font-semibold text-red-600'>
          Error loading pending approvals
        </div>
      )}
    </div>
  );
}

export default UserApprovals;

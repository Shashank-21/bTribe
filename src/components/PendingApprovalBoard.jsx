function PendingApprovalBoard({ name, role }) {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='shadow-xl w-fit p-10 text-stone-500 bg-stone-300 rounded-xl text-center'>
        <p className='text-4xl'>
          Welcome, <span className='font-semibold text-stone-700'>{name}</span>
        </p>
        <p className='mt-5 text-2xl'>
          Your {role} account is yet to be approved by the admin
        </p>
        <p className='mt-5 text-2xl'>
          Contact{" "}
          <span className='font-semibold text-stone-700'>
            admin@btribe.co.in
          </span>{" "}
          for any queries
        </p>
      </div>
    </div>
  );
}

export default PendingApprovalBoard;

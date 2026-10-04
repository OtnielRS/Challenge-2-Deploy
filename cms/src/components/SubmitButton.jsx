export default function SubmitButton({ condition }) {
  return (
    <div className="mt-5 flex justify-center p-4">
      <button className="w-1/2 mt-5 py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-[#606C38] hover:bg-[#283618] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
        {condition}
      </button>
    </div>
  );
}

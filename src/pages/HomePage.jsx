import ReactRotatingText from 'react-rotating-text'
import Button from '../components/Button';
function HomePage() {
  const reactRotatingText = <ReactRotatingText items={['job', 'MBA admit', 'internship']} className='font-bold text-7xl' pause={2500} />

  return (<>
    <section className='flex flex-col justify-center items-center min-h-[28rem] bg-stone-200'>
      <p className='mb-3 text-5xl'>
        Grab that dream
      </p>
      {reactRotatingText}
      <p className='mt-3 text-5xl'>that you've always wanted</p>
      <Button primary className='text-xl mt-10'>Start Learning</Button>
    </section>
  </>)
}

export default HomePage;
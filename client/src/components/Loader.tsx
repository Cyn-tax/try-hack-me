import { Circles } from "react-loader-spinner"

const Loader = () => {
  return(
    <Circles
    height="80"
    width="80"
    color="blue"
    ariaLabel="circles-loading"
    wrapperClass=""
    visible={true}
    wrapperStyle={
      {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  />
  )
}
export default Loader


const FlashMessage = ({message}:{message:string})=>{
    return(
        <div className={"flash-error"}>
            {message}
        </div>
    )
}
// Error.d = {
//     message:'An error occurred',
// }

export default FlashMessage;
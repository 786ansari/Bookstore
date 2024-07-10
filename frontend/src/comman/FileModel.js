import { addBookToCart } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"

const FIleModel  = (props) => {
  const addToCart = async (item) => {
    let data = {
      fileId: item._id,
      bookId:item.bookId
    }
    let result = await addBookToCart(data)
    HotToaster(result.status, result.message)
  }
    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add any file to cart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      {props?.showFiles?.length>0 && props.showFiles.map((item,i)=>{
        return <div className="row" style={{display:"flex",justifyContent:"space-between"}}>
          <button className="btn btn-danger" onClick={()=>addToCart(item)} >
            {item.fileType.toUpperCase()} File
            </button>
        </div>
      })}
      </div>
    </div>
  </div>
</div>
    )
}

export default FIleModel
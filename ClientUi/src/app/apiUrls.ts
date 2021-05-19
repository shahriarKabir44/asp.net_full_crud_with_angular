import { environment } from "src/environments/environment";

export class ApiUirls {
  public static AddStudent: string = environment.rootUrl + 'Student/AddNewStudent'
  public static GetAllDisciplines: string = environment.rootUrl + 'Home/GetAllDisciplines'
  public static GetAllStudents: string = environment.rootUrl + 'Student/GetAll'
  public static GetStudentById: string = environment.rootUrl + 'Student/FindStudent/?id='
  public static GetProductsOf: string = environment.rootUrl + 'Product/GetProductsOf/?owner='
  public static FindProduct: string = environment.rootUrl + "Product/FindProduct/?id="
  public static UpdateStudent: string = environment.rootUrl + "Student/Update"
  public static DeleteStudent: string = environment.rootUrl+"Student/Delete/?id="
}

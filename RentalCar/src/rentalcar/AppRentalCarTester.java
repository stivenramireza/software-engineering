package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public class AppRentalCarTester {
    
    // Patron de diseño Singleton
    
    private static AppRentalCarTester sSoleInstance;
	
	private AppRentalCarTester() {	
	}
        public static AppRentalCarTester getInstance(){
            if(sSoleInstance == null){
                sSoleInstance = new AppRentalCarTester();
            }
            return sSoleInstance;
        }
    
}

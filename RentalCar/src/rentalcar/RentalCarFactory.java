package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public class RentalCarFactory implements CarFactory {

  @Override
  public FamilyCar createFamilyCar() {
    return new FamilyCar();
  }

  @Override
  public SportCar createSportCar() {
    return new SportCar();
  }

  @Override
  public StandardCar createStandardCar() {
    return new StandardCar();
  }
   
    
}

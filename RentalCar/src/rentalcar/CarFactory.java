package rentalcar;

/**
 *
 * @author Stiven Ramirez Arango
 * @since 25/08/2018
 * @version 1.0
 */
public interface CarFactory {
    
    FamilyCar createFamilyCar();
    SportCar createSportCar();
    StandardCar createStandardCar();
    
    // Si se quiere añadir otro tipo de carro se puede crear aqui
}

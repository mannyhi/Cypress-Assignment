Feature: Login and Cart Management

  Scenario: User logs in, adds items to cart, and completes checkout
    Given the user is on the login page
    When the user logs in with username "standard_user" and password "secret_sauce"
    And the user adds "Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt", "MRF Bat" to the cart
    And the items are present in the CSV file "testData.csv"
    Then the items should be present in the cart
    When the user removes "Sauce Labs Bike Light" from the cart
    And the user proceeds to checkout and enters "John", "Doe", "12345"
    And the user removes "Sauce Labs Bolt T-Shirt" during checkout
    When the user proceeds to the final checkout
    Then if the total price is less than $40, the user clicks "Finish"
    And the user should see "Thank you for your order!"
    And if the total price is greater than $40, the user clicks "Cancel"
    When the user navigates back to the home page
    And the user logs out

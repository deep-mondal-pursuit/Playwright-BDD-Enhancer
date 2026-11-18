@ui @e2e @regression
Feature: Shopping cart journey in Demo Web Shop

  As a registered customer
  I want to log in, add a product to my shopping cart, remove it and log out
  So that I know the core shopping cart journey works end to end

  @smoke
  Scenario: Customer adds a product to the cart, removes it and logs out
    Given the user is on the login page
    When the user logs in with valid credentials
    Then the user should be logged in
    And the "Electronics" category should be displayed in the menu
    When the user browses to the "Cell phones" category under "Electronics"
    Then the "Cell phones" page should be displayed
    When the user opens the product "Smartphone"
    Then the "Smartphone" page should be displayed
    When the user adds the product to the cart
    And the user opens the shopping cart
    Then the "Shopping cart" page should be displayed
    And the shopping cart should contain the product "Smartphone"
    When the user removes the product "Smartphone" from the cart
    And the user logs out
    Then the user should be logged out successfully

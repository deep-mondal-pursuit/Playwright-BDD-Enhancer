@e2e
Feature: Complete purchase journey in Demo Web Shop

  As a customer
  I want to complete a purchase from login to order confirmation
  So that I can verify the full checkout journey

  Scenario: Customer can complete a purchase end to end
    Given the user is on the login page
    When the user logs in with valid credentials
    Then the inventory page should be displayed
    When the user adds the product "Smartphone" to the cart
    And the user opens the shopping cart
    Then the shopping cart should contain the product
    When the user removes the product and logs out
    Then the user should be logged out successfully
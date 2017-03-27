Feature: Customers Service
Scenario: List customers when system is empty
      √ Given that there are no customers in the system
      √ When the client requests a list of customers
      √ Then the response is a empty list
Scenario: As a client I can add a customer to the system
      √ When the client adds a customer
      √ Then the system should add a customer successfully!
      √ And the response should indicate success and status
      √ And the response should indicate a non-null id of the customer
Scenario: List customers given the system has one customer with name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"
      √ When the client requests a list of customers
      √ Then the response is a non-empty list with size 1
      √ And the customer should have attributes id, name, dob, gender
      √ And the customer should have non-null values for attributes id, name, dob, gender
      √ And the customer will have name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"
Scenario: List specific customer given the system has one customer with name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"
      √ When the client requests a customer by providing an id
      √ Then the response is a non-empty customer object
      √ And the customer should have attributes id, name, dob, gender
      √ And the customer should have non-null values for attributes id, name, dob, gender
      √ And the customer will have name: "J.R.R. Tolkien", dob: "01/01/1984", gender: "Male"
Scenario: Customer Service will allow to delete a customer
      √ When the client deletes the customer by id
      √ Then the system should delete a customer successfully!
      √ And the response should indicate success and status and a subsequent request for list of customers should have an empty list response
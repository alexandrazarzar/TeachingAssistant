Feature: As a professor
  I want to register students
  So that I can manage them

Scenario: Registering student with non registered CPF
  Given I am at the students page
  And I cannot see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
  When I try to register the student "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br"
  Then I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list

Scenario: Registering student with already registered CPF
  Given I am at the students page
  And I can see "Luis" with CPF "31953028020" and email "luis@cin.ufpe.br" in the students list
  When I try to register the student "Manoel" with CPF "31953028020" and email "manoel@cin.ufpe.br"
  Then I can see an error message
  And I cannot see "Manoel" with CPF "31953028020" and email "manoel@cin.ufpe.br" in the students list
  And I can see "Luis" with CPF "31953028020" and email "luis@cin.ufpe.br" in the students list

Scenario: Registering student with non registered CPF, service
  Given The system has no student with CPF "75333051402" and name "Paulo"
  When I register the student "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br"
  Then The system stores "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br"

Scenario: Registering student with already registered CPF, service
  Given The system has a student "Jose" with CPF "50754513491" and email "jose@cin.ufpe.br"
  When I register the student "Paulo" with CPF "50754513491" and email "paulo@cin.ufpe.br"
  Then The system has no student with CPF "50754513491" and name "Paulo"
  And The system stores "Jose" with CPF "50754513491" and email "jose@cin.ufpe.br"

Scenario: Registering student with invalid CPF, service
  Given The system has no student with CPF "12345678910" and name "Maria"
  When I register the student "Maria" with CPF "12345678910" and email "maria@cin.ufpe.br"
  Then The system has no student with CPF "12345678910" and name "Maria"

Scenario: Registering student with invalid CPF
  Given I am at the students page
  And I cannot see "Luis" with CPF "12345678910" and email "luis@cin.ufpe.br" in the students list
  When I try to register the student "Luis" with CPF "12345678910" and email "luis@cin.ufpe.br"
  Then I can see an error message
  And I cannot see "Luis" with CPF "12345678910" and email "luis@cin.ufpe.br" in the students list

Scenario: Registering student with email not from CIn, service
  Given The system has no student with CPF "12345678910" and name "Maria"
  When I register the student "Maria" with CPF "12345678910" and email "maria@gmail.com"
  Then The system has no student with CPF "12345678910" and name "Maria"

Scenario: Registering student with email not from CIn
  Given I am at the students page
  And I cannot see "Jose" with CPF "70446531030" and email "jose.com.br" in the students list
  When I try to register the student "Jose" with CPF "70446531030" and email "maria@gmail.com"
  Then I can see an error message
  And I cannot see "Jose" with CPF "70446531030" and email "jose.com.br" in the students list

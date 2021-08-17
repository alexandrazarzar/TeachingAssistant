Feature: As a professor
  I want to register students
  So that I can manage them

Scenario: Registering student with non registered CPF, service
  Given The system has no student with CPF "75333051402" and name "Paulo"
  When I register the student "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br"
  Then The system stores "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br"

Scenario: Registering student with already registered CPF, service
  Given The system has a student "Jose" with CPF "50754513491" and email "jose@cin.ufpe.br"
  When I register the student "Paulo" with CPF "50754513491" and email "paulo@cin.ufpe.br"
  Then The system has no student with CPF "50754513491" and name "Paulo"
  And The system stores "Jose" with CPF "50754513491" and email "jose@cin.ufpe.br"
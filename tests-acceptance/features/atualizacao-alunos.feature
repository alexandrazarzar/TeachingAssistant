Feature: student update
As a professor
I want to  update students informations
so that they're registered correctly 

Scenario: Successful student update.
  Given I am at the students page
  And I can see "Luis" with CPF "31953028020" and email "luis@cin.ufpe.br" in the students list
  When I try to update "Luis" whose CPF is "31953028020" to "Luis" with CPF "94701094064" and email "luis@cin.ufpe.br"
  Then I can see "Luis" with CPF "94701094064" and email "luis@cin.ufpe.br"

Scenario: Unsuccessful student update due to duplicated CPF.
  Given I am at the students page
  And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
  And I can see "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br" in the students list
  When I try to update "Gustavo" whose CPF is "80590589083" to "Gustavo" with CPF "75333051402" and email "gustavo@cin.ufpe.br"
  Then I can see an error message
  And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
  And I can see "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br" in the students list

Scenario: Unsuccessful student update due to invalid CPF.
  Given I am at the students page
  And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
  When I try to update "Gustavo" whose CPF is "80590589083" to "Gustavo" with CPF "0101" and email "gustavo@cin.ufpe.br"
  Then I can see an error message
  And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list

Scenario: Unsuccessful student update due to empty fields.
  Given I am at the students page
  And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
  When I try to update "Gustavo" whose CPF is "80590589083" to "Gustavo" with CPF "" and email ""
  Then I can see an error message
  And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list

Scenario: Successful student update, service
  Given The system has a student "Jose" with CPF "50754513491" and email "jose@cin.ufpe.br"
  When I update "Jose" whose CPF is "50754513491" to "Jose" with CPF "50754513491" and email "ze@cin.ufpe.br"
  Then The system stores "Jose" with CPF "50754513491" and email "ze@cin.ufpe.br"


Feature: student update
As a professor
I want to  update students informations
so that they're registered correctly 


Scenario: Successful student update.
Given I am at the students page
And I can see "Luis" with CPF "31953028020" and email "luis@cin.ufpe.br" in the students list
When I try to update "Luis"'s information to Name "Luis" and CPF "94701094064" and email "luis@cin.ufpe.br"
Then I can see "Luis" with CPF "94701094064" and email "luis@cin.ufpe.br"

Scenario: Unsuccessful student update due to duplicated CPF.
Given I am at the students page
And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
And I can see "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br" in the students list
When I try to update "Gustavo"s information to Name "Gustavo" and CPF "75333051402" and email "gustavo@cin.ufpe.br"
Then I can see an error message
And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
And I can see "Paulo" with CPF "75333051402" and email "paulo@cin.ufpe.br" in the students list

Scenario: Unsuccessful student update due to invalid CPF.
Given I am at the students page
And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
When I try to update "Gustavo"'s information to Name "Gustavo" and CPF "0101" and email "gustavo@cin.ufpe.br"
Then I can see an error message
And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list

Scenario: Scenario: Unsuccessful student update due to empty fields.
Given I am at the students page
And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list
When I try to update "Gustavo"'s information to Name "Gustavo" and CPF "" and email ""
Then I can see an error message
And I can see "Gustavo" with CPF "80590589083" and email "gustavo@cin.ufpe.br" in the students list

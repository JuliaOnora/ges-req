import { CreateUserUseCase } from "../../src/useCases/user/createUser";

const userMock = {
	goodRequest: "1",
	badRequest: false
};

describe("Creating user process", () =>{
	test("Should return true if there is a user id in req.params", async() => {
		const result = jest.spyOn(await CreateUserUseCase, user)
			.mockImplementationOnce(userMock.goodRequest);
		expect(result).toBe(true);
	})
})

